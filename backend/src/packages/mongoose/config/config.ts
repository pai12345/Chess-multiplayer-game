const MongoDB = {
  MONGODB_URI:
    "mongodb+srv://admin:admin@cluster-andromeda.ms09l.mongodb.net/Andromeda?retryWrites=true&w=majority",
};

const generateEnv = () => {
  return {
    MongoDB: MongoDB,
  };
};

export default generateEnv;
