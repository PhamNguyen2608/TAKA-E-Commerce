const { SUCCESS, OK, ERROR, FAIL } = require('../../configs/constants');
const generateToken = require('../../helpers/generate_token');
const HttpException = require('../../helpers/http_exception');
const verifyToken = require('../../helpers/verify_token');
const UserModel = require('../../models/user.model');
const UserHandlers = require('../user/handlers');
const jwt = require('jsonwebtoken');
class SignHandlers {
  async verify(data) {
    const { access_token } = data;
    const verifiedData = verifyToken(access_token);

    if (!verifiedData)
      return {
        status: ERROR,
        response: new HttpException(401, 'User has not logged in!'),
        // response: {
        //   status: ERROR,
        //   message: 'Verification code has expired, please re-register!',
        //   // data: response.data,
        // },
      };

    const { _id } = verifiedData;
    const result = await UserHandlers.getOneUser(_id);

    if (result.status === ERROR)
      return {
        status: ERROR,
        response: new HttpException(401, 'User has not logged in!'),
      };

    const { response } = result;

    return {
      status: SUCCESS,
      response: {
        status: OK,
        message: 'Verify user successfully!',
        data: response.data,
      },
    };
  }

  async login(data) {
    const { email, password } = data;

    const result = await UserModel.findOne({
      email,
      password,
    });
    if (result?.verify === false) {
      return {
        status: ERROR,
        response: {
          status: ERROR,
          message:
            'The account is not verified, please check your email to verify!!',
        },
      };
    }

    if (!result || result === 'null' || result === 'undefined')
      return {
        status: ERROR,
        response: new HttpException(400, 'Sai email hoặc mật khẩu!'),
      };

    const { _id, role } = result;
    const token = generateToken({ _id, role });

    return {
      status: SUCCESS,
      response: {
        status: OK,
        message: 'Đăng nhập thành công!',
        data: {
          _id,
          role,
          token,
        },
      },
    };
  }
  async activate(data) {
    const { activation_token } = data;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    const { email, password } = user;

    const result = await UserModel.findOne({
      email,
      password,
    });

    if (!result || result === 'null' || result === 'undefined')
      return {
        status: ERROR,
        response: new HttpException(400, 'Sai email hoặc mật khẩu!'),
      };

    const { _id, role } = result;
    const token = generateToken({ _id, role });

    return {
      status: SUCCESS,
      response: {
        status: OK,
        message: 'Đăng nhập thành công!',
        data: {
          _id,
          role,
          token,
        },
      },
    };
  }
}

module.exports = new SignHandlers();
