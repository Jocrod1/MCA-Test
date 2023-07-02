
export type LoaderAction = {
    type: string,
}

export type DispatchLoader= (args: LoaderAction) => LoaderAction;