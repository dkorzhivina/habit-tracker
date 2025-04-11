module.exports = (sequelize, DataTypes) => {
    const Habit = sequelize.define('Habit', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      frequency: {
        type: DataTypes.STRING,
        defaultValue: 'daily'
      },
      goal: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: '#4f46e5'
      }
    }, {
      timestamps: true
    });
  
    Habit.associate = (models) => {
      Habit.belongsTo(models.User, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
      });
      Habit.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      });
    };
  
    return Habit;
  };