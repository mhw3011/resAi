"use client";

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import JakeResumePreview from "@/components/templates/JakeResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { deleteResume } from "./actions";
import { useReactToPrint } from "react-to-print";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isPending, startTransition] = useTransition();

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const resumeData = mapToResumeValues(resume);
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  const TemplateComponent =
    resumeData.template === "jake" ? JakeResumePreview : ResumePreview;

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resume.id);
        setShowDeleteConfirmation(false);
      } catch {
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>

        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <TemplateComponent
            resumeData={resumeData}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={reactToPrintFn}
          >
            <Printer className="size4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete resume?</DialogTitle>
            <DialogDescription>
              This will permanently delete this resume. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <LoadingButton
              variant="destructive"
              onClick={handleDelete}
              loading={isPending}
            >
              Delete
            </LoadingButton>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
