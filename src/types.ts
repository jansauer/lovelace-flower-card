import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "custom-card-helpers";

declare global {
  interface HTMLElementTagNameMap {
    "flower-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }
}

export interface FlowerCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  entity?: string;
  min_moisture?: number;
  max_moisture?: number;
  min_conductivity?: number;
  max_conductivity?: number;
  min_brightness?: number;
  max_brightness?: number;
  min_temperature?: number;
  max_temperature?: number;
}
