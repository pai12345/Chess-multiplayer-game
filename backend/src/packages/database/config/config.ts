const MongoDB = {
  MONGODB_URI: "mongodb://localhost:27017/chess24",
};

const generateEnv = () => {
  return {
    MongoDB: MongoDB,
  };
};

export default generateEnv;
