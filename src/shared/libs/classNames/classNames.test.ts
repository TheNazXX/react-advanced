import { classNames } from 'shared/libs/classNames/classNames'

describe('classNames', () => {
  test('First Test', () => {
    expect(classNames('someClass', {}, [])).toBe('someClass')
  })

  test('With classes', () => {
    expect(classNames('class1', { hover: true, active: false, closing: true }, ['class2'])).toBe('class1 class2 hover closing')
  })
})
