import _ from '../wrap/lodash'

import tdFunction from '../function'
import isGenerator from './is-generator'

interface CreateImitationType {
  (original: IArguments, names: string[]): any[]
  <T>(original: T[], names: string[]): T[]
  <T>(original: T, names: string[]): T
}

const createImitation: CreateImitationType = (original, names: string[]) => {
  if (_.isArray(original) || _.isArguments(original)) {
    return []
  } else if (_.isFunction(original)) {
    if (isGenerator(original)) {
      return original
    } else {
      // TODO: this will become src/function/create and include parent reference instead of name joining here
      return tdFunction(_.map(names, String).join('') || '(anonymous function)')
    }
  } else {
    return _.clone(original)
  }
}

export default createImitation
