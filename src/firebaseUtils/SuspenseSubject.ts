export class SuspenseSubject<T> {
  private _status: "loading" | "loaded" | "error" = "loading";
  readonly _promise: Promise<T>;
  private _error?: unknown = undefined;
  private _data?: T;

  constructor(origPromise: Promise<T>) {
    this._promise = origPromise
      .then((data: T) => {
        this._status = "loaded";
        this._data = data;
        return data;
      })
      .catch((error) => {
        this._status = "error";
        this._error = error;
        return undefined as any;
      });
  }

  get value(): T {
    this.suspenseIfNeeded();
    return this._data!;
  }

  suspenseIfNeeded(): void {
    if (this._status === "loading") {
      throw this._promise;
    }
    if (this._status === "error") {
      throw this._error;
    }
  }

  get promise() {
    return this._promise;
  }
}
