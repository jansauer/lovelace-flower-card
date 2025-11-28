import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues,
} from "lit-element";
import { HomeAssistant, hasConfigOrEntityChanged, LovelaceCardEditor } from "custom-card-helpers";

import "./editor";
import { FlowerCardConfig } from "./types";
import { CARD_VERSION, DEFAULTS } from "./const";
import { Styles } from "./styles";

/* eslint no-console: 0 */
console.info(
  `%c FLOWER-CARD %c ${CARD_VERSION}`,
  "color: white; background: forestgreen; font-weight: 700;",
  "color: forestgreen; background: white; font-weight: 700;",
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "flower-card",
  name: "Flower Card",
  description: "A template custom card for you to create something awesome",
});

@customElement("flower-card")
export class FlowerCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("flower-card-editor");
  }

  @property() public hass!: HomeAssistant;
  @property() private config!: FlowerCardConfig;

  public setConfig(config: FlowerCardConfig): void {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }

    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  protected render(): TemplateResult | void {
    const plant = this.hass.states[this.config.entity || ""];

    return html`
      <ha-card tabindex="0" .label=${`Boilerplate: ${this.config.entity || "No Entity Defined"}`}>
        <div class="header">
          <img src=${plant.attributes.entity_picture} />
          <div class="info">
            <h1 id="name">${plant.attributes.friendly_name}</h1>
          </div>
        </div>

        <div class="attributes">
          ${this.renderAttribute(plant, "moisture", "mdi:water-percent")}
          ${this.renderAttribute(plant, "conductivity", "mdi:leaf")}
          ${this.renderAttribute(plant, "brightness", "mdi:white-balance-sunny")}
          ${this.renderAttribute(plant, "temperature", "mdi:thermometer")}
        </div>
      </ha-card>
    `;
  }

  private renderAttribute(plant: any, attr: string, icon: string): TemplateResult | void {
    const val = plant.attributes[attr];
    const min = this.config["min_" + attr] || DEFAULTS["min_" + attr];
    const max = this.config["max_" + attr] || DEFAULTS["max_" + attr];
    const unit = plant.attributes.unit_of_measurement_dict[attr];
    const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)));

    return html`
      <div class="attribute" title="${val} ${unit} | ${min} ~ ${max} ${unit}">
        <ha-icon icon=${icon}></ha-icon>
        <div class="meter red">
          <span class=${val < min || val > max ? "bad" : "good"} style="width: 100%;"></span>
        </div>
        <div class="meter green">
          <span class=${val > max ? "bad" : "good"} style="width:${pct}%;" />
        </div>
        <div class="meter red">
          <span class="bad" style="width:${val > max ? 100 : 0}%;" />
        </div>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return Styles;
  }
}
