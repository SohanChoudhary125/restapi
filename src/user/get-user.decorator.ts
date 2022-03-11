import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  const info =
    req.args[0].res.socket.parser.socket._httpMessage.socket.parser.incoming
      .user;

  return info;
});
