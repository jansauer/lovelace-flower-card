import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
} from "lit-element";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "custom-card-helpers";

import { FlowerCardConfig } from "./types";

@customElement("flower-card-editor")
export class FlowerCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass?: HomeAssistant;
  @property() private _config?: FlowerCardConfig;
  @property() private _helpers?: any;
  private _initialized = false;

  public setConfig(config: FlowerCardConfig): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _entity(): string {
    if (this._config) {
      return this._config.entity || "";
    }

    return "";
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    // restrict options to plant domain type
    const entities = Object.keys(this.hass.states).filter(
      (eid) => eid.substr(0, eid.indexOf(".")) === "plant",
    );

    return html`
      <div class="card-config">
        <paper-input
          label="Name (Optional)"
          .value=${this._config?._name}
          @value-changed=${this._valueChanged}
          .configValue=${"name"}
        ></paper-input>

        <paper-dropdown-menu
          label="Entity (Required)"
          @value-changed=${this._valueChanged}
          .configValue=${"entity"}
        >
          <paper-listbox slot="dropdown-content" .selected=${entities.indexOf(this._entity)}>
            ${entities.map((entity) => {
              return html` <paper-item>${entity}</paper-item> `;
            })}
          </paper-listbox>
        </paper-dropdown-menu>

        <div class="side-by-side">
          <paper-input
            label="Minimal Moisture"
            type="number"
            .value=${this._config?._min_moisture}
            @value-changed=${this._valueChanged}
            .configValue=${"min_moisture"}
          ></paper-input>
          <paper-input
            label="Maximal Moisture"
            type="number"
            .value=${this._config?._max_moisture}
            @value-changed=${this._valueChanged}
            .configValue=${"max_moisture"}
          ></paper-input>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Minimal Conductivity"
            type="number"
            .value=${this._config?.min_conductivity}
            @value-changed=${this._valueChanged}
            .configValue=${"min_conductivity"}
          ></paper-input>
          <paper-input
            label="Maximal Conductivity"
            type="number"
            .value=${this._config?.max_conductivity}
            @value-changed=${this._valueChanged}
            .configValue=${"max_conductivity"}
          ></paper-input>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Minimal Brightness"
            type="number"
            .value=${this._config?.min_brightness}
            @value-changed=${this._valueChanged}
            .configValue=${"min_brightness"}
          ></paper-input>
          <paper-input
            label="Maximal Brightness"
            type="number"
            .value=${this._config?.max_brightness}
            @value-changed=${this._valueChanged}
            .configValue=${"max_brightness"}
          ></paper-input>
        </div>

        <div class="side-by-side">
          <paper-input
            label="Minimal Temperature"
            type="number"
            .value=${this._config?.min_temperature}
            @value-changed=${this._valueChanged}
            .configValue=${"min_temperature"}
          ></paper-input>
          <paper-input
            label="Maximal Temperature"
            type="number"
            .value=${this._config?.max_temperature}
            @value-changed=${this._valueChanged}
            .configValue=${"max_temperature"}
          ></paper-input>
        </div>
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }

    if (target.configValue) {
      if (target.value === "") {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.value,
        };
      }
    }
    fireEvent(this, "config-changed", { config: this._config });
  }

  static get styles(): CSSResult {
    return css`
      paper-dropdown-menu {
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 8px;
      }
      .side-by-side > :last-child {
        padding-right: 0px;
      }
    `;
  }
}
