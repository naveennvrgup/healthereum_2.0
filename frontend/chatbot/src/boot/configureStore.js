import MainStore from "../store/DomainStore/HomeStore";

export default function() {
  const mainStore = new MainStore();

  return {
    mainStore
  };
}
