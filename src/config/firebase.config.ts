import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3e3VNZup42jt4SbPozJTEMU_2f050Qyw",
  authDomain: "sweeft-api.firebaseapp.com",
  projectId: "sweeft-api",
  storageBucket: "sweeft-api.appspot.com",
  messagingSenderId: "103912421084",
  appId: "1:103912421084:web:d5569ae0e4c14a15632619",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const adminApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "sweeft-api",
    clientEmail: "firebase-adminsdk-gsuw2@sweeft-api.iam.gserviceaccount.com",
    privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD5cSxIGDlnjiXU\no9Ea9ErSzlqVqoyj1M5MhZEBZtbl4ads9VgMTj4vg6sjhyUxxkr87edMa/4dC6Jn\n8gkqWhx5yHMjJTRabgiuKL8lzQ4fh1J8/amVh7j8AqdPZLJoT4KYZXXDHUjCF2dF\n1sMw/m2TugoGSRHBkY37rfYzLgjcT6J3LgrrXabH45p2LWB8FeXu4sMzxFgjrAda\njbHYEoIuKV5VpK/0M4/3Ke9pgd97mOv18Xp1Q/RZYOxwsDy3jR3B67rCd49fkYt4\nAtRC1qrZpBBkp+dCRYM01ch4n3ao2++mz1jTfRNnSjSC26EotJGXJY+O92dsxNvc\n2IB7aZPlAgMBAAECggEADS57G9M142BKZP6ELBO5SYMQm+Sfmn/CKB6Nz2BnHk5K\nqfIcJUhUNnATkOTRJRx4tX1/8dSqINBO1IXgkJ2i8BeU6AhNCDNU35k1IrL/mlBt\nHkBMYCPENYMRYttsJyF+gf2ol7c6M1GHylPDTFlBoqMb6QGe/9bohSKIBmPaIYQ0\nGTnBV9OXH2pr8f8dVrPQ+05cUyO2EY99pOKSXtp7ijPttwf/hBZ+Xc5l5HMRLz0S\n576KysI0PN6WF3sRcagJ4BlBGG6/BnNURQxFgHohyjH5dBn5gISUif1DV9hTmBwL\nWodmhOzBlVagmQrLZLHDvs8g8BfBQYDdzWtabgfYQQKBgQD8txpj08lsbEsorvSi\ncROI5OommJ8BLTV5Qlhu2nhk0bLZ+MBzZy+EYyc3lk3qTj6Lp6KUxwL6l0L/2LN5\n8duaFh+7QnXmxihBdCZzO/4it8Oj/aCl3ZSgpYt6IBEZVEgkE81cLTyUuGKEGdHq\nwreFRCXFj/DmroqzZRapn0PTQQKBgQD8ry24+XZB7x22U14e3zggO0Su5qbGZOAP\nL09tuKo3694//aGTmkPb88DN+ZtcSkE28XOKM8B3urN3GDAj3eJ7u64L55QmlGVD\nQrUbGXapaJ24EkkXVX6Y7mbVKowmyGqpeUPh1GmX3Tfb5iwbqxKU3ZtL375QTpm2\ndqyBnxarpQKBgH9nkFZjn1iaAAoyqgJ7H24UejebGg5tzFelqw+39JpfXdumHOAR\nVVNY6ZyMmhtV9xJRIRYAfu/28kAp79G6rQuxu62cg/QkUoctF3Vg+W5nVqqGY0c7\nvoJ+8yJOqFAsvXHyycV+yNvxWTlgCwRfxkXZZXGEb97cf/CRNiutr3QBAoGAF+qQ\nvlBGRClYu5gacXuZOVvCvXcxU9faaTWGJBF1cwONLqtX7ruMLrZcimJUtSCGGagy\n0mLhlbODJwOQEuT+ec2ixJevqxMinoIi2CTJ2XEAdJqudlnuOJVgAE8dotIXXmEO\n7sIHGIukrNiVVi0T/ikXeM/9mGZIIEANRduD7s0CgYB2A+cthj4OwAar3J+hycBS\nuiox1/fL4k2VcmiRdgrCBOo5c30b2YdGt8PjV8tJBPknjuMa5gniYBOUKE+KTJeq\n+zNfO2vUHwM2IkK+Untmri3SMIm0fA0Z0VoyZnSM4Bd1DOwIZGRbxdLyDn8Ojdfv\ni02sCMLeq00W1b+f3sOkYA==\n-----END PRIVATE KEY-----\n`,
  }),
});

const adminAuth = getAdminAuth(adminApp);

export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error: any) {
    throw {
      statusCode: 400,
      data: error.code,
      message: "Could not create user.",
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error: any) {
    throw {
      statusCode: 401,
      data: error.code,
      message: "Invalid Credentials",
    };
  }
};

export const confirmUserToken = async (token: string) => {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error: any) {
    error.statusCode = 401;
    error.data = error.message;
    console.log("error confirmation   ", error);
    throw {
      statusCode: 401,
      message: "Unauthorized",
    };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    error.statusCode = error.code;
    error.data = error.message;
    throw {
      statusCode: 500,
      data: error.code,
    };
  }
};

const listAllUserIds = async (nextPageToken?: string): Promise<string[]> => {
  const listUsersResult = await adminAuth.listUsers(1000, nextPageToken);

  const ids = listUsersResult.users.map(
    (userRecord) => (userRecord.toJSON() as { uid: string }).uid
  );

  if (listUsersResult.pageToken) {
    return [...ids, ...(await listAllUserIds(listUsersResult.pageToken))];
  } else {
    return ids;
  }
};

export const resetUsersInFirebase = async () => {
  try {
    const ids = await listAllUserIds();

    await adminAuth.deleteUsers(ids);

    console.log("Reseted all users in Firebase");
  } catch (error: any) {
    console.log("Failed to reset all users in Firebase", error);
  }
};
