import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProviders';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import ImailProvider from './MailProvider/models/IMailProvider';
import EtherealProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<ImailProvider>(
  'MailProvider',
  new EtherealProvider(),
);
