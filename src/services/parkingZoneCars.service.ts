import ParkingZoneCarsRepository from "../repositories/parkingZoneCars.repository";

class ParkingZoneCarsService {
  async getParkingZoneHistory() {
    return await ParkingZoneCarsRepository.getHistoryForAdmin();
  }
}

export default new ParkingZoneCarsService();
