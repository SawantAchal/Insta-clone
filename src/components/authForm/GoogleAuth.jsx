import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { auth, firestore } from '../../firebase/firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = ({prefix}) => {
  // coming from firebase hooks
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login)

  const handleGoogleAuth = async() =>{
    try {
      const newUser = await signInWithGoogle()
      if (!newUser && error) {
        showToast("Error",error.message,'error')
        return;
      }

      // checking user is exits in database or not and provide a snap shot of existing doc
      const userRef = doc(firestore,"users" . newUser.user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        // for login.
        const userDoc = userSnap.data();
        localStorage.setItem("user-info",JSON.stringify(userDoc))
        loginUser(userDoc)
      }
      else{
        //sign up
        const userDoc = {
          uid:newUser.user.uid,
          email:newUser.user.email,
          // split email to show userrname
          username:newUser.user.email.split('@')[0],
          fullName:newUser.user.displayName,
          bio:'',
          profilePicURL:newUser.user.photoURL,
          followers:[],
          following:[],
          posts:[],
          createdAt:Date.now()
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem('user-info' , JSON.stringify(userDoc))
        loginUser(userDoc)
      }
    } catch (error) {
      showToast("Error", error.message,"error")
    }
  }
  return (
    <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
        <Image src='/google.png' w={5} alt='google logo'/>
        <Text mx={2} color={'blue.500'}>{prefix} with Google</Text>
    </Flex>
  )
}

export default GoogleAuth