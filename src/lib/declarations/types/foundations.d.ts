export type voidish = null | undefined;
export type NBtn = HTMLButtonElement | null;
export type NInput = HTMLInputElement | null;
export type NDialog = HTMLDialogElement | null;
// FRAMEWORKS
export type NRDispatch<T> = React.Dispatch<React.SetStateAction<T>> | voidish;
