abstract class Result<T> { }

class ResultLoading<T> extends Result<T> { }

class ResultSuccess<T> extends Result<T> {
    constructor(public data: T) { super() }
}

class ResultFailed<T> extends Result<T> {
    constructor(public message: string) { super() }
}

export { Result, ResultLoading, ResultSuccess, ResultFailed }