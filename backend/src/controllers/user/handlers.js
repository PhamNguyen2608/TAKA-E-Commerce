const {
  SUCCESS,
  OK,
  ERROR,
  PAGE_SIZE,
  CLIENT_API,
} = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const generateToken = require('../../helpers/generate_token');
const EmailService = require('../../services/sendEmail');
const HttpException = require('../../helpers/http_exception');
const AddressModel = require('../../models/address.model');
const UserModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');
require('../../models/category.model');
require('../../models/brand.model');

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};
class UserHandlers {
  async createUser(data) {
    try {
      const user = await UserModel.findOne({ email: data.email });
      if (user && user?.verify === true) {
        return {
          status: ERROR,
          response: {
            status: ERROR,
            message: 'Account already exists',
          },
        };
      }
      if (user?.verify == false) {
        const newUser = {
          username: user?.first_name + user?.last_name,
          email: user.email,
          password: user.password,
        };
        const activation_token = createActivationToken(newUser);
        const url = `${CLIENT_API}/activate/${activation_token}`;
        EmailService.sendEMail(
          newUser.email,
          url,
          newUser.username,
          'Please verify your email!'
        );

        delete user['password'];
        delete user['role'];

        return {
          status: SUCCESS,
          response: {
            status: OK,
            message:
              'The account is not verified, please check your email to verify',
            data: user,
          },
        };
      }
      if (!user) {
        const result = await UserModel.create(data);
        if (!result || result === 'null')
          return {
            status: ERROR,
            response: new HttpException(400, 'Can not create user!'),
          };
        const newUser = {
          username: result?.first_name + result?.last_name,
          email: result.email,
          password: result.password,
        };
        const activation_token = createActivationToken(newUser);
        const url = `${CLIENT_API}/activate/${activation_token}`;
        EmailService.sendEMail(
          newUser.email,
          url,
          newUser.username,
          'Please verify your email!'
        );

        delete result['password'];
        delete result['role'];

        return {
          status: SUCCESS,
          response: {
            status: OK,
            message: 'Create user successfully!',
            data: result,
          },
        };
      }

      // const activation_token = createActivationToken(newUser);
      // const url = `http://localhost:3000/activate/${activation_token}`;
      // EmailService.sendEMail(
      //   newUser.email,
      //   url,
      //   newUser.username,
      //   'Please verify your email!'
      // );

      // delete result['password'];
      // delete result['role'];

      // return {
      //   status: SUCCESS,
      //   response: {
      //     status: OK,
      //     message: 'Create user successfully!',
      //     data: result,
      //   },
      // };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async loginWithGoogle(data) {
    const { email } = data;

    try {
      const result = await UserModel.findOne({
        email,
      });
      let userInfo = result;

      if (!result || result === 'null') {
        const newUser = await UserModel.create(data);

        if (!newUser || newUser === 'null')
          return {
            status: ERROR,
            response: new HttpException(400, 'Can not create user!'),
          };

        userInfo = newUser;
      }

      delete userInfo['password'];

      const { _id, role } = userInfo;
      const token = generateToken({ _id, role });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Login successfully!',
          data: { ...userInfo.toObject(), token },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateUser(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await UserModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update user!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async changePassword(userId, data) {
    try {
      const { old_password, new_password } = data;
      const userInfo = await UserModel.findOne({ _id: userId });

      if (old_password === new_password)
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not use old password!'),
        };

      if (old_password !== userInfo.password)
        return {
          status: ERROR,
          response: new HttpException(400, 'Password does not match!'),
        };

      const option = {
        new: true,
        runValidations: true,
      };
      const newUserInfo = await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: new_password },
        option
      );
      const newToken = generateToken({
        _id: newUserInfo._id,
        role: newUserInfo.role,
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update password user successfully!',
          data: {
            token: newToken,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUsers(params, conditions) {
    try {
      const { limit, start, page, search } = conditions;
      let query = { ...params };
      const sortQuery = {};

      if (search?.trim()) {
        query = {
          $or: [
            { first_name: { $regex: search, $options: 'i' } },
            { last_name: { $regex: search, $options: 'i' } },
          ],
        };
      }
      // if (search?.trim()) query.$text = { $search: search };

      const total = await UserModel.countDocuments(query);
      const results = await UserModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit)
        .select('-password');

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get users!'),
        };

      const responseWithAddresses = await Promise.all(
        results.map((item) => {
          return new Promise(async (resolve, reject) => {
            try {
              const addresses = await AddressModel.find({ user: item._id });
              const newItem = {
                ...item.toObject(),
                addresses,
              };
              resolve(newItem);
            } catch (error) {
              resolve(item);
            }
          });
        })
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get users successfully!',
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
          data: responseWithAddresses,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneUser(_id) {
    try {
      // const result = await UserModel.findOne({
      //   _id,
      // }).select('-password');
      const query = { _id };
      const data = { verify: true };
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await UserModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get user!'),
        };

      const address = await AddressModel.find({ user: _id });
      if (address?.length > 0) result.address = address;

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeUser(_id) {
    try {
      const result = await UserModel.deleteOne({ _id });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get user!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'remove user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new UserHandlers();
