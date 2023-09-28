import ParkingZoneRepository from "../repositories/parkingZone.repository";

class ParkingZoneService {
  async createParkingZone(name: string, address: string, rate: number) {
    const parkingZone = await ParkingZoneRepository.createParkingZone({
      name,
      address,
      rate,
    });

    return parkingZone;
  }
}

export default new ParkingZoneService();
