import { ValueObjectAbstract } from '@sofkau/ddd';
import * as Joi from 'joi';

const FIELD_NAME = 'roleId';

export class RoleIdValueObject extends ValueObjectAbstract<string> {
  private readonly schema: Joi.ObjectSchema<{ value: Joi.SchemaLike }>;

  constructor(value?: string) {
    super(value);
    this.schema = Joi.object({
      value: Joi.string()
        .required()
        .guid({ version: 'uuidv4' })
        .messages({
          'string.base': `El ${FIELD_NAME} del rol debe ser de tipo texto`,
          'string.empty': `El ${FIELD_NAME} del rol no puede estar vacío`,
          'string.guid': `El ${FIELD_NAME} del rol debe ser un uuid valido`,
          'any.required': `El ${FIELD_NAME} del rol es requerido`,
        }),
    });
  }

  validateData(): void {
    const { error } = this.schema.validate({ value: this._value });
    if (error) this.setError({ field: FIELD_NAME, message: error.message });
  }
}
