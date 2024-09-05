import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
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
    const searchParams = useSearchParams();
    const create = searchParams.get('create');
    const open = create === "new";
    const [loading, setLoading] = useState(false);
    return (
        <Dialog >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <Input disabled={loading} id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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
    )
}