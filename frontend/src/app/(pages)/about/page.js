import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";

export const metadata = {
  title: "About Us - Rethwrit",
};

export default function About() {
  return (
    <div className="darklight py-2">
      <div className="container mx-auto bg-dlmode p-2 rounded-lg">
        <h1 className="text-3xl">About Us</h1>
        <p>
          Welcome to Rethwrit - Your Comprehensive AI-Powered Education Hub!
        </p>
        <section className="my-1">
          <h2 className="text-violet-700">Our Mission</h2>
          <p>
            Our mission is to empower learners of all ages with the tools and
            resources they need to excel in their educational journey. We are
            driven by the idea that every individual deserves access to
            high-quality educational content that sparks curiosity, fosters
            creativity, and nurtures growth.
          </p>
        </section>

        <section className="my-1">
          <h2 className="text-violet-700">What We Offer</h2>
          <ul>
            <li>
              <strong>AI-Driven Insights:</strong> Our cutting-edge AI
              technology tailors learning experiences to individual needs,
              ensuring optimized comprehension and retention.
            </li>
            <li>
              <strong>Comprehensive Coverage:</strong> From primary education to
              college-level expertise, Rethwrit covers a vast array of subjects,
              ensuring a seamless transition through various educational
              milestones.
            </li>
            <li>
              <strong>Latest Updates:</strong> Stay informed with the latest
              news, developments, and trends in the education sector. Our
              platform keeps you updated with relevant and timely information.
            </li>
            <li>
              <strong>Exam Tools:</strong> Prepare with confidence using our
              advanced exam tools, designed to simulate real-world exam
              scenarios and enhance your readiness.
            </li>
            <li>
              <strong>Study Materials:</strong> Access a treasure trove of study
              materials, ranging from interactive ebooks to multimedia
              presentations, curated to make learning engaging and effective.
            </li>
          </ul>
        </section>

        <section className="my-1">
          <h2 className="text-amber-700">Founder&apos;s Vision</h2>
          <p>
            <span className="flex float-left">
              Satyam Prakash
              <Link href="https://www.linkedin.com/in/imsatyam2610/" className="ml-1">
                <BsLinkedin />
              </Link>
            </span>
            , the driving force behind Rethwrit, envisions a world where
            education transcends physical boundaries. With a passion for
            innovation and a deep commitment to educational equity, Satyam
            Prakash aims to empower learners worldwide, enabling them to shape
            their own futures through knowledge and learning.
          </p>
        </section>

        <section className="my-1">
          <h2 className="text-violet-700">Join Us in this Journey</h2>
          <p>
            We invite educators, learners, and enthusiasts to join us in this
            transformative journey. Let&apos;s redefine education together,
            making it accessible, interactive, and impactful for everyone.
            Together, we can shape a brighter future through the power of
            knowledge.
          </p>
        </section>

        <section className="my-1">
          <p>
            Read Think Write with Rethwrit - Where Learning Knows No Bounds!
          </p>
        </section>
      </div>
    </div>
  );
}
