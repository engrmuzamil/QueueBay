// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { Chrome, Facebook, Apple } from "lucide-react"
// import Link from "next/link"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// export default function SignUpPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
//           <p className="mt-2 text-sm text-gray-600">Enter your information to create an account</p>
//         </div>

//         <div className="bg-white p-8 rounded-lg shadow-sm border">
//           <form className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
//                   First name
//                 </Label>
//                 <Input id="firstName" type="text" placeholder="Lee" className="w-full" required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
//                   Last name
//                 </Label>
//                 <Input id="lastName" type="text" placeholder="Robinson" className="w-full" required />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <Label className="text-sm font-medium text-gray-700">I want to:</Label>
//               <RadioGroup defaultValue="buyer" className="flex space-x-6">
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="buyer" id="buyer" />
//                   <Label htmlFor="buyer" className="text-sm font-normal cursor-pointer">
//                     Buy
//                   </Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="seller" id="seller" />
//                   <Label htmlFor="seller" className="text-sm font-normal cursor-pointer">
//                     Sell
//                   </Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Email
//               </Label>
//               <Input id="email" type="email" placeholder="m@example.com" className="w-full" required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//                 Password
//               </Label>
//               <Input id="password" type="password" className="w-full" required />
//             </div>

//             <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
//               Sign Up
//             </Button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <Separator className="w-full" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-white px-2 text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-3 gap-3">
//               <Button variant="outline" className="w-full bg-transparent">
//                 <Chrome className="h-4 w-4" />
//                 <span className="sr-only">Sign up with Google</span>
//               </Button>
//               <Button variant="outline" className="w-full bg-transparent">
//                 <Facebook className="h-4 w-4" />
//                 <span className="sr-only">Sign up with Facebook</span>
//               </Button>
//               <Button variant="outline" className="w-full bg-transparent">
//                 <Apple className="h-4 w-4" />
//                 <span className="sr-only">Sign up with Apple</span>
//               </Button>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link href="/login" className="font-medium text-black hover:underline">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Chrome, Facebook, Apple } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your information to create an account</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First name
                </Label>
                <Input id="firstName" type="text" placeholder="Lee" className="w-full" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last name
                </Label>
                <Input id="lastName" type="text" placeholder="Robinson" className="w-full" required />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">I want to:</Label>
              <RadioGroup defaultValue="buyer" className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer" className="text-sm font-normal cursor-pointer">
                    Buy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seller" id="seller" />
                  <Label htmlFor="seller" className="text-sm font-normal cursor-pointer">
                    Sell
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input id="email" type="email" placeholder="m@example.com" className="w-full" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input id="password" type="password" className="w-full" required />
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
              Sign Up
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Chrome className="h-4 w-4" />
                <span className="sr-only">Sign up with Google</span>
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Sign up with Facebook</span>
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Apple className="h-4 w-4" />
                <span className="sr-only">Sign up with Apple</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-black hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
