import ITemplateVariables from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: ITemplateVariables): Promise<string>;
}
