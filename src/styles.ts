import { css } from "lit-element";

export const Styles = css`
  .header {
    display: flex;
    height: 80px;
    padding-top: 8px;
  }

  .header > img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    margin-left: 16px;
    margin-right: 16px;
    box-shadow: var(
      --ha-card-box-shadow,
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2)
    );
  }

  .info {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    overflow: hidden;
  }
  .header #name {
    font-weight: bold;
    width: 100%;
    margin-top: 16px;
    text-transform: capitalize;
    display: block;
  }
  .header #problem {
    text-transform: capitalize;
    color: #8c96a5;
    display: block;
  }

  .attributes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 5px 16px;
  }
  .attribute {
    display: inline-block;
    white-space: normal;
  }
  .attribute ha-icon {
    margin-right: 4px;
  }

  .meter {
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 2px;
    display: inline-grid;
    overflow: hidden;
  }
  .meter.red {
    width: 10%;
  }
  .meter.green {
    width: 60%;
  }
  .meter > span {
    grid-row: 1;
    grid-column: 1;
    height: 100%;
  }
  .meter > .good {
    background-color: rgba(43, 194, 83, 1);
  }
  .meter > .bad {
    background-color: rgba(240, 163, 163);
  }
`;
