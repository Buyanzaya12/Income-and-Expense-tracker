import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export function RecordDialog() {
  const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const create = searchParams.get('create');
    const router = useRouter();
    const open = create === "new";
    return (
      <>
        <Dialog open={open}>
        <DialogContent onClose={() => router.push(`?`)} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <Input disabled={loading} id="name" onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <DialogFooter>
            {/* {
              editingCategory ? (
                <Button disabled={loading} className="w-full !rounded-full" onClick={updateCategory}>Update</Button>
              ) :
                (
                  <Button disabled={loading} className="w-full !rounded-full" onClick={createNew}>Add</Button>
                )
            } */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
    )
}