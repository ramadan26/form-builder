# Form Builder
Is a third party for rendering dynamic fields (select, input, checkbox, radio buttons) inside a form with customizable
styling attributes.

## Installing

after cloning this [repo](https://bitbucket.org/KuwaitNET/fleep2mm_migration) into the server:

1) python 3.6 and above is required.

2) install python requirements:

```shell
python3 -m pip install -r requirements.txt
```

3) Install ImageMagic for Ubuntu:

```shell
sudo apt install imagemagick
```

4) Install GraphicsMagic for CentOS:

```shell
sudo yum install GraphicsMagick GraphicsMagick-devel GraphicsMagick-perl
```

## 2- Setup Config Files

### 1. Setup the `.env` file:

1) Create a file called `.env` in the project root directory.

2) Use the following `.env` file template:

```dotenv
MM_SERVER = ""

FLEEP_SERVER = "https://fleep.io"
FLEEP_USERNAME = ""
FLEEP_PASSWORD = ""

MM_USERNAME = "admin"
MM_PASSWORD = "TestPassword2021!@#"

MM_DB_USERNAME = "mmuser"
MM_DB_PASSWORD = "mmuser_password"
MM_DB_NAME = "mattermost"
MM_DB_HOST = "localhost"
```

`MM_SERVER`: Represents MatterMost server API endpoint, don't forget to append `/api/v4/`,
local server example `https://127.0.0.1/api/v4/`

#### `FLEEP_SERVER`: Represents the fleep base server url.

`FLEEP_USERNAME`: Represents the username of the fleep user that is being used to get the history.

`FLEEP_PASSWORD`: Represents the password of the fleep user that is being used to get the history.

`MM_USERNAME`: Represents the username of a MatterMost admin user that is being used to read the messages from
MatterMost API.

`MM_PASSWORD`: Represents the password of a MatterMost admin user that is being used to read the messages from
MatterMost API.

`MM_DB_USERNAME`: Represents the MatterMost database username.

`MM_DB_PASSWORD`: Represents the MatterMost database password.

`MM_DB_NAME`: Represents the MatterMost database name.

`MM_DB_HOST`: Represents the MatterMost database host.

### 2. Setup The `import_settings.json` File:

1) create a file called `import_settings.json` in the project root directory.

2) use the following `import_settings.json` template:

```json
{
  "download_conversations_attachments": [
    "channel_id"
  ],
  "attachments_base_directory": "/mattermost/data/",
  "replace_emojis": {
    "B_button_(blood_type)": "b"
  },
  "admin_users_to_create": [
    {
      "username": "admin",
      "email": "admin@example.com",
      "password": "TestPassword2021!@#",
      "channels": [
        "devs-only-and-coo-and-cto-subscribe-to-notifications-in-pinned-m"
      ]
    }
  ],
  "existing_users_path": "old_dump.jsonl"  
}
```

|Attribute|Type|Mandatory| Description                                                                                                                                                                                                                                                                                                          |
|---|---|---|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`download_conversations_attachments`|list of strings|No| A list of strings that contains the channels ids that its attachments will be downloaded and imported, the special string `"__all__"` is used to download all conversations attachments.                                                                                                                             |
|`attachments_base_directory`|string|Yes| File storage settings in MatterMost `config.json`, you can find it in the `FileSettings` object inside the `Directory` attribute.                                                                                                                                                                                    |
|`replace_emojis`|object (key: string)|No| Used to replace the weird emoji naming by the python lib with proper naming, the key represents the weird emoji name, the value represents the proper name.                                                                                                                                                          |
|`admin_users_to_create`|list of objects|Yes (at least one user to be used inside the `.env` file)| A list of objects, each object represents a user that has the following mandatory attributes: `username` `email` `password` `channels` (channels is a list of strings, each one represents the channel name that the user will be added to, the special string `"__all__"` is used to add the user to all channels). |
|`existing_users_path`|string|No| The directory of a jsonl file containing the result of `mattermost export bulk old_dump.jsonl`                                                                                                                                                                                                                       |

## 3- Run `mattermost export bulk old_dump.jsonl`

This command will export the current MatterMost data, it will be used to extract existing users in order to avoid creating these users on the current data import.


## 4- Run `download_user_history.py`

This script will download the bot user history by downloading each conversation's history and then merging it into one importable history file.

```shell
python download_user_history.py
```

```shell
usage: download_user_history.py [-h] [--batch-size [BATCH_SIZE]] [--convs-dir [CONVS_DIR]] [--out-dir [HISTORY_OUTPUT_DIRECTORY]]

optional arguments:
  -h, --help            show this help message and exit
  --batch-size [BATCH_SIZE]
                        The number of downloaded conversations per batch
  --convs-dir [CONVS_DIR]
                        The downloaded conversations history files directory
  --out-dir [HISTORY_OUTPUT_DIRECTORY]
                        The output of the user's history json file
```

## 5- Run `download_fleep_attachments.py`

This script is used to download attachments that a fleep user has.

The user history is needed as a `.json` file.

```shell
python download_fleep_attachments.py
```

```shell
usage: download_fleep_attachments.py [-h] [--history-dir [HISTORY_DIRECTORY]] [--out-dir [DOWNLOAD_DIRECTORY]]

optional arguments:
  -h, --help            show this help message and exit
  --history-dir [HISTORY_DIRECTORY]
                        the history json file directory
  --out-dir [DOWNLOAD_DIRECTORY]
                        the attachments download directory
```

## 6- Run The Following Command to Resize Image Attachments:

### for Ubuntu:

```shell
find -print | grep ".*jpg\|png\|jpeg\|svg$" | xargs mogrify -resize 1280x720!
```

### for CentOS:

```shell
find -print | grep ".*jpg\|png\|jpeg\|svg$" | xargs gm mogrify -resize 1280x720!
```

## 7- Run Fleep Json to MM Jsonl Converter:


### 1) Run `main_single_import.py` for a Single File:

```shell
python main_single_import.py
```

```shell
usage: main_single_import.py [-h] [--settings-dir [SETTINGS_DIRECTORY]] [--history-dir [HISTORY_DIRECTORY]] [--data-out-dir [DATA_OUT_DIRECTORY]] [--pw-out-dir [PW_OUT_DIRECTORY]]

optional arguments:
  -h, --help            show this help message and exit
  --settings-dir [SETTINGS_DIRECTORY]
                        the settings json file directory
  --history-dir [HISTORY_DIRECTORY]
                        the history json file directory
  --data-out-dir [DATA_OUT_DIRECTORY]
                        the created MatterMost jsonl data file directory
  --pw-out-dir [PW_OUT_DIRECTORY]
                        the directory of the json file that contains the created users emails, usernames and passwords
```

### 2) Run `main_multi_import.py` for Multiple Files:

```shell
python main_multi_import.py
```

```shell
usage: main_multi_import.py [-h] [--settings-dir [SETTINGS_DIRECTORY]] [--histories-dir [HISTORIES_DIRECTORY]] [--out-dir [OUT_DIRECTORY]] [--pw-out-dir [PW_OUT_DIRECTORY]]

options:
  -h, --help            show this help message and exit
  --settings-dir [SETTINGS_DIRECTORY]
                        the settings json file directory
  --histories-dir [HISTORIES_DIRECTORY]
                        the directory where the history json files are.
  --out-dir [OUT_DIRECTORY]
                        the directory where to output MatterMost jsonl data files.
  --pw-out-dir [PW_OUT_DIRECTORY]
                        the directory of the json file that contains the created users emails, usernames and passwords
```

## 8- Run Passwords Backup:

```shell
python backup_passwords.py --backup
```

## 9- Run MatterMost Import Tool:

### 1) For a Single File:

```shell
mattermost import bulk <resulting_data_file>.jsonl --apply
```

### 2) For Multiple Files

This script will import each jsonl file in the `<main_multi_import_out_dir>` directory and export logs to result.txt file:

```shell
./run_mm_import.sh <main_multi_import_out_dir> > result.txt 2>&1
```

to check out a summarized result run this after `run_mm_import.sh`:
```shell
python get_import_summary.py > result_summary.txt
```


## 10- Run Passwords Restore:

```shell
python backup_passwords.py --restore
```

## 11- Remove The Fleep Migrate User

don't forget to remove the fleep migrate using MatterMost CLI tool, after the entire migration operation is finished.

```shell
mattermost user delete fleep.migrate
```

## 12- (Optional) Building a Patched MatterMost Server

Building a MatterMost server will be for editing the behavior of the built-in import tool, mainly to enable pinned
messages imports and other features that are needed to make the fleep migration smoother.

### 1- Set up the development server by following the official steps [here](https://developers.mattermost.com/contribute/server/developer-setup/)

### 2- applying the patch
```sh
cd mattermost-server
wget https://patch-diff.githubusercontent.com/raw/mattermost/mattermost-server/pull/19487.patch -O diff.patch
git apply diff.patch
rm diff.patch
cd ..
```

### 3- On the same directory level of the cloned server code, run the following command
```sh
mkdir -p mattermost-webapp/dist
```

after this step the directory should look like this
```
some-dir
├─── mattermost-server
└─── mattermost-webapp
```

### 4- Download the official mattermost built server from [here](https://mattermost.com/deploy/) and extract it on the same directory level of the cloned MatterMost server code.

### 5- Run the following command
```sh
cp -r mattermost/client/* mattermost-webapp/dist
```

### 6- build the server
```sh
cd mattermost-server
make build
make package-linux
```
After the build finishes, the built version should be in `mattermost-server/dist`.
