# 🌱 Lovelace Flower Card for Home Assistant

A visual plant card for the [Home Assistant](https://www.home-assistant.io) Lovelace UI.

## Installation

### HACS (recommended)

This card can be instlled via the [HACS](https://hacs.xyz/) (Home Assistant Community Store).
<small>_HACS is a third party community store and is not included in Home Assistant out of the box._</small>

Just add `https://github.com/jansauer/lovelace-flower-card` as a [custom repository](https://hacs.xyz/docs/faq/custom_repositories).

### Manual install

1. Download and copy `flower-card.js` from the [latest release](https://github.com/jansauer/lovelace-flower-card/releases) into your `config/www` directory.

2. Add a reference to `flower-card.js` inside your `ui-lovelace.yaml` or at the top of the _raw config editor UI_:

```yaml
resources:
  - url: /flower-card.js?v=x.x.x
    type: module
```

Or use the new [Lovelace Configuration UI](https://www.home-assistant.io/blog/2020/03/18/release-107/#hello-multiple-lovelace-dashboards). Don't forget to enable “Advenced mode” in your user profile to see the “Resources” tab.

## Options

| Name             | Type   | Requirement  | Description                              | Default |
| ---------------- | ------ | ------------ | ---------------------------------------- | ------- |
| type             | string | **Required** | `custom:flower-card`                     |
| entity           | string | **Required** | Home Assistant plant entity              | `none`  |
| min_moisture     | number | Optional     | Minimal moisture the plant tolerates     | `15`    |
| max_moisture     | number | Optional     | Maximal moisture the plant tolerates     | `60`    |
| min_conductivity | number | Optional     | Minimal conductivity the plant tolerates | `330`   |
| max_conductivity | number | Optional     | Maximal conductivity the plant tolerates | `1930`  |
| min_brightness   | number | Optional     | Minimal brightness the plant tolerates   | `2800`  |
| max_brightness   | number | Optional     | Maximal brightness the plant tolerates   | `47000` |
| min_temperature  | number | Optional     | Minimal temperature the plant tolerates  | `7`     |
| max_temperature  | number | Optional     | Maximal temperature the plant tolerates  | `33`    |

## Example

```yaml
type: custom:flower-card
entity: plant.ficus
```
