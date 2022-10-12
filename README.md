# Form Builder
Is a third party for rendering dynamic fields (select, input, checkbox, radio buttons) inside a form with customizable
styling attributes.

## Installing

After cloning this [repo](https://github.com/ramadan26/form-builder) into your machine:

### node packages:

```shell
npm install
```

> **_NOTE:_**
> Tested with node `16.17.0` npm `8.15.0`.

## Config the data file

Go to `src/common/data/fields.json` and modify to meet your requirements and keep in mind these:
#### 1. For `checkbox` tag &rarr; `BaseCheckbox`
#### 2. For `Input` tag &rarr; `BaseInput`
#### 3. For `Select` tag &rarr; `BaseSelect`
#### 4. For `Radio` tag &rarr; `BaseRadioGroup`

## Serving

After installing and set up your requirements, run `npm run serve`