module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: '#6b7280'
      }
    }, {
      timestamps: true
    });
  
    Category.associate = (models) => {
      Category.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });
      Category.hasMany(models.Habit, {
        foreignKey: 'CategoryId',
        as: 'habits'
      });
    };
  
    return Category;
  };