module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING
      },
      isTwoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      twoFactorSecret: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: true
    });
  
    User.associate = (models) => {
      User.hasMany(models.Habit, {
        foreignKey: 'UserId',
        as: 'habits'
      });
      User.hasMany(models.Category, {
        foreignKey: 'UserId',
        as: 'categories'
      });
    };
  
    return User;
  };