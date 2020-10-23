export { Formatter, Validator, cep } from './'
import Brindex from './'
export class Br extends Brindex {}

export function init() {
  return new Br().init()
}
