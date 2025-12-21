import { TOKENS } from "../../lib/data/inputTokens";
import { DropPayload } from "../../lib/declarations/interfaces/utils";
export class DataTransferAdapter {
  public static toPayload(transfer: DataTransfer): DropPayload {
    const types = DataTransferAdapter.#typesToArray(transfer.types as any), // ? !DOMStringList[Symbol.iterator], like window.location.ancestorOrigins and ReturnType<window.localStorage.keys>
      filesFromItems = DataTransferAdapter.#filesFromItems(transfer.items),
      filesFromList = Array.from(transfer.files),
      files = filesFromItems.length ? filesFromItems : filesFromList,
      text =
        types.length && types.includes(TOKENS.transfer.textPlain)
          ? transfer.getData(TOKENS.transfer.textPlain) || null
          : null;
    return Object.freeze({ files, text, types });
  }
  static #typesToArray(types: DOMStringList): string[] {
    const result: string[] = [];
    for (let i = 0; i < types.length; i++)
      result.push((types.item(i) ?? "") as string);
    return result.filter(Boolean);
  }
  static #filesFromItems(items: DataTransferItemList | null): File[] | [] {
    if (!items) return [];
    const out: File[] = [];
    for (const item of Array.from(items))
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) out.push(file);
      }
    return out;
  }
}
