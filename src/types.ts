/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConcernItem {
  id: string;
  iconName: string;
  title: string;
  question: string;
}

export interface ReasonItem {
  number: string;
  iconName: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialStory {
  situationBefore: string;     // 働く前の状況
  anxiety: string;             // 不安だったこと
  storeSelection: string;      // 店選び
  firstDayImpression: string;  // 初日の感想
  workingHours: string;        // 1日の勤務時間
  actualEarnings: string;      // 実際の収入
  currentStatus: string;       // 現在どうなったか
}

export interface TestimonialVerification {
  verifiedDate: string;        // 確認日
  docType: string;             // 確認書類
  complianceCheck: string;     // 年齢・適法性確認
  storeName: string;           // 在籍直営料亭
  verificationId: string;      // 認証管理番号
  signatureMatch: string;      // 自署サイン照合
  consentDate: string;         // 掲載同意日
  methodSummary: string;       // 確認方法の要約
}

export interface TestimonialItem {
  id: string;
  name: string;
  avatarUrl: string;
  signatureUrl: string;
  signatureName: string;
  tag: string;
  age: string;
  status: string;
  quote: string;
  highlightEarnings: string;
  monthlyAverage: string;
  story: TestimonialStory;
  verification: TestimonialVerification;
}

export interface JobFactItem {
  id: string;
  iconName: string;
  title: string;
  highlight: string[];
}

export interface FlowStep {
  number: string;
  title: string;
}
