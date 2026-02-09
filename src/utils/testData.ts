export const orangehrm = {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    credentials: {
      username: 'Admin',
      password: 'admin123',
    },
    invalidCredentials: {
      username: 'Admin',
      password: 'wrongPassword123',
    },
    personalDetails: {
      employeeFullName: 'Adrian Navarro',
      employeeId: '12345',
      driversLicenseNumber: 'D1234567',
      otherId: 'OID-999',
      licenseExpiryDate: '2030-10-10',
      nationality: 'Mexican',
      maritalStatus: 'Single',
      dateOfBirth: '1995-01-01',
      gender: 'Male', // o 'Female' según opción
    },
    customFields: {
      bloodType: 'O+',
      testField: 'QA-AUTOMATION',
    },
  };
  