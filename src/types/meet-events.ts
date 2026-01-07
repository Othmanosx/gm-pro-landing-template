export interface Subscription {
  name: string;
  uid: string;
  targetResource: string;
  eventTypes: string[];
  notificationEndpoint: {
    pubsubTopic?: string;
  };
  state: string; // ACTIVE, SUSPENDED, DELETED
  createTime: string;
  updateTime: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  leftAt?: string;
  status: "joined" | "left";
}

export interface ParticipantEvent {
  eventType: string;
  conferenceRecord: string;
  participant: {
    name: string;
    email: string;
    userId: string;
  };
  timestamp: string;
}

export interface MeetEventPayload {
  eventType: string;
  conferenceRecord?: string;
  participant?: {
    name: string;
    email: string;
    userId: string;
  };
  timestamp: string;
}

export const MEET_EVENT_TYPES = {
  CONFERENCE_STARTED: "google.workspace.meet.conference.v2.started",
  CONFERENCE_ENDED: "google.workspace.meet.conference.v2.ended",
  PARTICIPANT_JOINED: "google.workspace.meet.participant.v2.joined",
  PARTICIPANT_LEFT: "google.workspace.meet.participant.v2.left",
  RECORDING_GENERATED: "google.workspace.meet.recording.v2.fileGenerated",
  TRANSCRIPT_GENERATED: "google.workspace.meet.transcript.v2.fileGenerated",
} as const;
