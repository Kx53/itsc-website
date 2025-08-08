// guides.ts - Guide data for the guide page
export interface GuideItem {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  url: string;
}

// Sample guide data - ข้อมูลตัวอย่างสำหรับการแสดงผล
export const sampleGuideData: GuideItem[] = [
  {
    id: "1",
    title: "วิธีการเข้าใช้งานระบบ Email มหาวิทยาลัย",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    author: "ทีม IT Support",
    date: "15 มกราคม 2567",
    url: "/guide/email-setup",
  },
  {
    id: "2",
    title: "การตั้งค่า VPN สำหรับการทำงานจากที่บ้าน",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Category1",
    author: "ทีม Network",
    date: "20 มกราคม 2567",
    url: "/guide/vpn-setup",
  },
  {
    id: "3",
    title: "คู่มือการใช้งานระบบ Learning Management System",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Category2",
    author: "ทีม Software",
    date: "25 มกราคม 2567",
    url: "/guide/lms-guide",
  },
  {
    id: "4",
    title: "การเชื่อมต่อ WiFi ภายในมหาวิทยาลัย",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    author: "ทีม Network",
    date: "30 มกราคม 2567",
    url: "/guide/wifi-setup",
  },
  {
    id: "5",
    title: "วิธีการสำรองข้อมูลบน Cloud Storage",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Category1",
    author: "ทีม Datacenter",
    date: "5 กุมภาพันธ์ 2567",
    url: "/guide/cloud-backup",
  },
  {
    id: "6",
    title: "การใช้งานซอฟต์แวร์ Microsoft Office 365",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Category2",
    author: "ทีม Software",
    date: "10 กุมภาพันธ์ 2567",
    url: "/guide/office365-guide",
  },
];
