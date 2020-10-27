import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from "custom-card-helpers";

declare global {
  interface HTMLElementTagNameMap {
    "flower-card-editor": LovelaceCardEditor;
    "hui-error-card": LovelaceCard;
  }
}

export interface FlowerCardConfig extends LovelaceCardConfig {
  type: string;
  test_gui?: boolean;
  entity?: string;
}
