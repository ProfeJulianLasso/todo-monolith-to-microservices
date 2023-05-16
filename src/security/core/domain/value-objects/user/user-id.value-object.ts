import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'userId';

export class UserIdValueObject extends ValueObjectAbstract<string> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: string) {
    super(value);
    this.schema = Joi.object({
      value: Joi.string()
        .required()
        .guid({ version: 'uuidv4' })
        .messages({
          'string.base': `El ${FIELD_NAME} del usuario debe ser de tipo texto`,
          'string.empty': `El ${FIELD_NAME} del usuario no puede estar vacío`,
          'string.guid': `El ${FIELD_NAME} del usuario debe ser un uuid valido`,
          'any.required': `El ${FIELD_NAME} del usuario es requerido`,
        }),
    });
  }

  validateData(): void {
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
