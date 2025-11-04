export type voidish = null | undefined;
export type NNd = Node | null;
export type NEl = Element | null;
export type NHtEl = HTMLElement | null;
export type NBtn = HTMLButtonElement | null;
export type NInput = HTMLInputElement | null;
export type NDialog = HTMLDialogElement | null;
export type NRDispatch<T> = React.Dispatch<React.SetStateAction<T>> | voidish;
