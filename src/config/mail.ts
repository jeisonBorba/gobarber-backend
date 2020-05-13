interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

// defaults.from.email must receive the domain mail configured in MailServer
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: '',
      name: '',
    },
  },
} as IMailConfig;
