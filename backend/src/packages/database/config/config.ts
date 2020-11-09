const MongoDB = {
  MONGODB_URI: "http://localhost:27017",
};

const generateEnv = () => {
  return {
    MongoDB: MongoDB,
  };
};

export default generateEnv;
