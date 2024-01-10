import axios from "axios";

class RestaurantService {
  restaurant() {
    return axios.get("http://localhost:8000/restaurant");
  }
  order(data) {
    return axios.post("http://localhost:8000/order", data);
  }
  orderList() {
    return axios.get("http://localhost:8000/order");
  }
  delivery(data) {
    return axios.post("http://localhost:8000/delivery", data);
  }
  updateDelivery(data, id) {
    return axios.put(`http://localhost:8000/delivery/${id}`, data);
  }
  DeliveryList() {
    return axios.get("http://localhost:8000/delivery");
  }
}
export default new RestaurantService();
