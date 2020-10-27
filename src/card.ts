import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  PropertyValues,
} from "lit-element";
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  LovelaceCardEditor,
  getLovelace,
} from "custom-card-helpers";

import "./editor";

import { FlowerCardConfig } from "./types";
import { CARD_VERSION } from "./const";
import { Styles } from "./styles";

/* eslint no-console: 0 */
console.info(
  `%c FLOWER-CARD %c ${CARD_VERSION}`,
  "color: white; background: forestgreen; font-weight: 700;",
  "color: forestgreen; background: white; font-weight: 700;"
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

  public static getStubConfig(): object {
    return {};
  }

  @property() public hass!: HomeAssistant;
  @property() private config!: FlowerCardConfig;

  public setConfig(config: FlowerCardConfig): void {
    if (!config || config.show_error) {
      throw new Error("Invalid configuration");
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
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
    if (this.config.show_warning) {
      return this.showWarning("Show Warning");
    }

    console.log(this.config.entity);
    const plant = this.hass.states[this.config.entity || ""];

    return html`
      <ha-card tabindex="0" .label=${`Boilerplate: ${this.config.entity || "No Entity Defined"}`}>
        <div class="header">
          <img src="/local/plants/ficus.jpg" />
          <div class="info">
            <h1 id="name">${plant.attributes.friendly_name}</h1>
            <span id="problem"></span>
          </div>
        </div>

        <div class="attributes">
          ${this.renderAttribute("temperature", "mdi:thermometer")}
          ${this.renderAttribute("brightness", "mdi:white-balance-sunny")}
          ${this.renderAttribute("moisture", "mdi:water-percent")}
          ${this.renderAttribute("conductivity", "mdi:leaf")}
        </div>
      </ha-card>
    `;
  }

  private renderAttribute(attr: string, icon: string): TemplateResult | void {
    const plant = this.hass.states["plant.ficus"];
    const val = plant.attributes[attr];
    const min = plant.attributes.limits["min_" + attr];
    const max = plant.attributes.limits["max_" + attr];
    const unit = plant.attributes.unit_of_measurement_dict[attr];

    const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)));

    return html`
      <div class="attribute" title="${val} ${unit} | ${min} ~ ${max} ${unit}">
        <ha-icon icon="${icon}"></ha-icon>
        <div class="meter red">
          <span class="${val < min || val > max ? "bad" : "good"}" style="width: 100%;"></span>
        </div>
        <div class="meter green">
          <span class="${val > max ? "bad" : "good"}" style="width:${pct}%;" />
        </div>
        <div class="meter red">
          <span class="bad" style="width:${val > max ? 100 : 0}%;" />
        </div>
      </div>
    `;
  }

  private showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private showError(error: string): TemplateResult {
    const errorCard = document.createElement("hui-error-card");
    errorCard.setConfig({
      type: "error",
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  static get styles(): CSSResult {
    return Styles;
  }
}
