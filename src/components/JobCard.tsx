import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Clock, DollarSign } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  skills: string[];
  onApply?: () => void;
}

export const JobCard = ({
  title,
  company,
  location,
  type,
  salary,
  skills,
  onApply,
}: JobCardProps) => {
  return (
    <Card className="p-6 hover:shadow-green-md transition-all duration-300 bg-card border-border">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{type}</span>
            </div>
            {salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{salary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-muted">
              {skill}
            </Badge>
          ))}
        </div>

        <Button
          onClick={onApply}
          className="w-full gradient-primary"
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
};