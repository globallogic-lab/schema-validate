/* @flow */

export class ValidatorResult {
  errors: Array<string>
  valid: boolean

  constructor() {
    this.errors = []
  }

  /**
   * Add new error object to collection
   * @param  {Error} error
   * @returns void
   */
  addError(error: string): void {
    this.errors.push(error)
  }

  /**
   * Print collected errors to console
   * @returns void
   */
  printErrors(): void {
    console.log(this.errors.reduce(function (acc: any, err: string) {
      return acc.concat(err + '\n')
    }, ''))
  }
}
