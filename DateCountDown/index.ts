import { stat } from "fs";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DateCountDown
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _container: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private _value: Date | undefined;
  private _diasAviso: number;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._container = container;
    this._notifyOutputChanged = notifyOutputChanged;
    this._value = context.parameters.value?.raw ?? undefined;
    this._diasAviso = context.parameters.diasAviso?.raw ?? 3;

    this.render(context);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const value = context.parameters.value.raw;
    if (value !== this._value) {
      this._value = value ?? undefined;
    }

    const diasAviso = context.parameters.diasAviso?.raw ?? 3;
    if (diasAviso !== this._diasAviso) {
      this._diasAviso = diasAviso;
    }

    this.render(context);
  }

  public getOutputs(): IOutputs {
    //eslint-disable-next-line no-debugger
    debugger;
    return {
      value: this._value ?? undefined,
    };
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private render(context: ComponentFramework.Context<IInputs>) {
    //eslint-disable-next-line no-debugger
    debugger;

    this._container.innerHTML = ""; // limpa conteúdo anterior

    const dataAlvo = context.parameters.value.raw;
    if (!dataAlvo) {
      this._container.innerText = "Data não informada";
      return;
    }

    const textoDias = context.parameters.textoDias?.raw ?? "";
    const hoje = new Date();
    const alvo = new Date(dataAlvo);
    const diasRestantes = this.calcularDiferencaDias(hoje, alvo);

    // Valores padrão
    const estados = [
      {
        nome: "vencido",
        diasCondicao: diasRestantes < 0,
        texto:
          context.parameters.textoVencido?.raw !== ""
            ? context.parameters.textoVencido?.raw
            : "",
        backgroundColor:
          context.parameters.corVencido?.raw !== ""
            ? context.parameters.corVencido?.raw
            : "#ccc", //"#e81123",
        textColor:
          context.parameters.textColorVencido?.raw !== ""
            ? context.parameters.textColorVencido?.raw
            : "#000",
      },
      {
        nome: "venceHoje",
        diasCondicao: diasRestantes === 0,
        texto:
          context.parameters.textoVenceHoje?.raw !== ""
            ? context.parameters.textoVenceHoje?.raw
            : "",
        backgroundColor:
          context.parameters.corVenceHoje?.raw !== ""
            ? context.parameters.corVenceHoje?.raw
            : "#ccc", //"#f7630c",
        textColor:
          context.parameters.textColorVenceHoje?.raw !== ""
            ? context.parameters.textColorVenceHoje?.raw
            : "#000",
      },
      {
        nome: "aVencer",
        diasCondicao: diasRestantes <= this._diasAviso,
        texto:
          context.parameters.textoAVencer?.raw !== ""
            ? context.parameters.textoAVencer?.raw
            : "",
        backgroundColor:
          context.parameters.corAVencer?.raw !== ""
            ? context.parameters.corAVencer?.raw
            : "#ccc", //"#fff100",
        textColor:
          context.parameters.textColorAVencer?.raw !== ""
            ? context.parameters.textColorAVencer?.raw
            : "#000",
      },
      {
        nome: "emDia",
        diasCondicao: diasRestantes > this._diasAviso,
        texto:
          context.parameters.textoEmDia?.raw !== ""
            ? context.parameters.textoEmDia?.raw
            : "",
        backgroundColor:
          context.parameters.corEmDia?.raw !== ""
            ? context.parameters.corEmDia?.raw
            : "#ccc", //"#107c10",
        textColor:
          context.parameters.textColorEmDia?.raw !== ""
            ? context.parameters.textColorEmDia?.raw
            : "#000",
      },
    ];

    const statusAtual = estados.find((e) => e.diasCondicao);

    // Cria o input
    const input = document.createElement("input");
    input.type = "date";
    input.value = new Date(dataAlvo).toISOString().split("T")[0];
    input.disabled = true;
    input.className = "j-pcf-date-input";
    this._container.appendChild(input);

    // Cria o elemento visual
    const statusDiv = document.createElement("div");
    statusDiv.className = "j-pcf-date-status";
    statusDiv.style.backgroundColor = statusAtual?.backgroundColor ?? "#ccc";
    statusDiv.style.color = statusAtual?.textColor ?? "#000";

    const texto = `${diasRestantes} ${textoDias} ${statusAtual?.texto}`;
    statusDiv.innerText = texto;
    statusDiv.title = texto;

    const divField = document.createElement("div");
    divField.className = "j-pcf-date-field";
    divField.style.display = "inline-flex";

    divField.appendChild(input);
    divField.appendChild(statusDiv);

    this._container.appendChild(divField);
    // this._container.appendChild(input);
    // this._container.appendChild(statusDiv);
  }

  private calcularDiferencaDias(data1: Date, data2: Date): number {
    const d1 = new Date(data1.getFullYear(), data1.getMonth(), data1.getDate());
    const d2 = new Date(data2.getFullYear(), data2.getMonth(), data2.getDate());
    const diff = d2.getTime() - d1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  }
}
