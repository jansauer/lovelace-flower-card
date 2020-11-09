# 🌱 Lovelace Flower Card for Home Assistant

A visual plant card for [Home Assistant](https://www.home-assistant.io) Lovelace UI.

## Installation

> :warning: **This card doesn't yet work with the latest Home Assistant Version!**<br>
> So far the [Plant Monitor Integrations](https://www.home-assistant.io/integrations/plant/) does not provide the upper and lower limits for measurements in a way that allows cards to use them.
> There is a Pull Request for adding this ([home-assistant/core#42420](https://github.com/home-assistant/core/pull/42420))


### HACS (recommended)

This card can be instlled via the [HACS](https://hacs.xyz/) (Home Assistant Community Store).  
<small>*HACS is a third party community store and is not included in Home Assistant out of the box.*</small>

Just add `https://github.com/jansauer/lovelace-flower-card` as a [custom repository](https://hacs.xyz/docs/faq/custom_repositories).

### Manual install

1. Download and copy `flower-card.js` from the [latest release](https://github.com/jansauer/lovelace-flower-card/releases) into your `config/www` directory.

2. Add a reference to `flower-card.js` inside your `ui-lovelace.yaml` or at the top of the *raw config editor UI*:

  ```yaml
  resources:
    - url: /flower-card.js?v=x.x.x
      type: module
  ```
Or use the new [Lovelace Configuration UI](https://www.home-assistant.io/blog/2020/03/18/release-107/#hello-multiple-lovelace-dashboards). Don't forget to enable “Advenced mode” in your user profile to see the “Resources” tab.

## Options

| Name              | Type    | Requirement  | Description                                 | Default             |
| ----------------- | ------- | ------------ | ------------------------------------------- | ------------------- |
| type              | string  | **Required** | `custom:flower-card`                        |
| entity            | string  | **Required** | Home Assistant plant entity                 | `none`              |

## Example

```yaml
type: custom:flower-card
entity: plant.ficus
```
