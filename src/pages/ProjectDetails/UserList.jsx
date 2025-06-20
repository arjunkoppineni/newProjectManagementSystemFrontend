/* eslint-disable no-constant-binary-expression */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/Redux/Issue/Action";
import { store } from "@/Redux/Store";
import { useDispatch, useSelector } from "react-redux";

export default function UserList({issueDetails}) {
    const {project} = useSelector(store=>store);

    const dispatch = useDispatch();
    const handleAssignIssueToUser = (userId) =>{
        dispatch(assignedUserToIssue({issueId: issueDetails.id, userId}));
    }
  return (
    <>
        <div className="space-y-2">
            <div className="border rounded-md">
                <p className="py-2 px-3">
                    {issueDetails.assignee?.fullname || "Unassigne"}
                </p>
            </div>
           {
            project.projectDetails?.team.map((item)=>
                <div onClick={()=>handleAssignIssueToUser(item.id)} key={item} className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center
            space-x-4 rounded-md border px-4">
                <Avatar>
                    <AvatarFallback>
                        {item.fullname[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p className="text-sm leading-none">
                        {item.fullname.charAt(0).toUpperCase() + item.fullname.slice(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {item.email}
                    </p>
                </div>
            </div>)
           }
        </div>
    </>
  );
}