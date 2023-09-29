import CarService from "../../../src/services/car.service";
import CarRepository, {
  CarInput,
} from "../../../src/repositories/car.repository";

jest.mock("../../../src/repositories/car.repository", () => ({
  createCar: jest.fn(),
}));

describe("CarService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a car successfully", async () => {
    const mockCarInput: CarInput = {
      brand: "Toyota",
      number: "XYZ123",
      type: "Sedan",
      year: "2023",
      UserId: 1,
    };

    const mockCreatedCar = {
      id: "car123",
      ...mockCarInput,
    };

    (CarRepository.createCar as jest.Mock).mockResolvedValue(mockCreatedCar);

    const createdCar = await CarService.createCar(mockCarInput, 1);

    expect(CarRepository.createCar).toHaveBeenCalledWith({
      ...mockCarInput,
      UserId: 1,
    });
    expect(createdCar).toEqual(mockCreatedCar);
  });

  it("should handle createCar rejection", async () => {
    const mockCarInput: CarInput = {
      brand: "Toyota",
      number: "XYZ123",
      type: "Sedan",
      year: "2023",
      UserId: 1,
    };

    const mockError = new Error("Database error");

    (CarRepository.createCar as jest.Mock).mockRejectedValue(mockError);

    await expect(CarService.createCar(mockCarInput, 1)).rejects.toThrow(
      mockError
    );

    expect(CarRepository.createCar).toHaveBeenCalledWith({
      ...mockCarInput,
      UserId: 1,
    });
  });
});
