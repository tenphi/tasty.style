import type { ReactNode } from 'react';
import { tasty } from '@tenphi/tasty';
import { IconBrandGithub, IconCloud } from '@tabler/icons-react';
import type { TintName } from '@/app/theme';
import Section from '@/app/components/Section';
import SectionWrap from '@/app/ui/SectionWrap';
import Grid from '@/app/ui/Grid';
import Card from '@/app/ui/Card';
import Badge from '@/app/ui/Badge';
import Text from '@/app/ui/Text';

const SubHeader = tasty({
  as: 'h3',
  styles: {
    preset: 'h3',
    color: '#text-soft',
    margin: 0,
    textAlign: 'center',
  },
});

const ArticleCard = tasty({
  as: 'a',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
    padding: '3x',
    radius: '1cr',
    fill: '#surface',
    border: '1bw solid #border',
    textDecoration: 'none',
    transition: 'shadow, translate',
    shadow: {
      '': 'none',
      ':hover': '0 1x 2x #shadow-sm',
    },
    translate: {
      '': '0 0',
      ':hover': '0 -3px',
    },
    Title: {
      $: '>',
      preset: 'h4',
      color: '#text',
      margin: 0,
    },
    Description: {
      $: '>',
      preset: 't2',
      color: '#text-soft',
      margin: 0,
    },
  },
  elements: {
    Title: 'h4',
    Description: 'p',
  },
});

interface UsageItem {
  name: string;
  tag: string;
  description: string;
  href: string;
  icon: ReactNode;
  tint: TintName;
}

const ARTICLES = [
  {
    title: 'Why I spent years trying to make CSS states predictable',
    description:
      'The origin story behind Tasty: how overlapping selectors in component systems led to a compiler that makes state resolution deterministic.',
    href: 'https://tenphi.me/blog/why-i-spent-years-trying-to-make-css-states-predictable/',
  },
];

const USAGE: UsageItem[] = [
  {
    name: 'Cube UI Kit',
    tag: 'Component Library',
    description:
      '100+ production components built with Tasty from the ground up. The design system that shaped the styling model under real-world pressure.',
    href: 'https://github.com/cube-js/cube-ui-kit',
    icon: <IconBrandGithub size={22} stroke={1.5} />,
    tint: 'coral',
  },
  {
    name: 'Cube Cloud',
    tag: 'Enterprise Product',
    description:
      'The universal semantic layer for data modeling, access control, caching, and APIs — powered by Cube UI Kit and Tasty in production.',
    href: 'https://cube.dev/product/cube-cloud',
    icon: <IconCloud size={22} stroke={1.5} />,
    tint: 'rose',
  },
  {
    name: 'tasty.style',
    tag: 'Documentation Site',
    description:
      'This very website — the marketing site, docs, and interactive playground for Tasty, built with Next.js and styled entirely with Tasty.',
    href: 'https://github.com/tenphi/tasty.style',
    icon: <IconBrandGithub size={22} stroke={1.5} />,
    tint: 'violet',
  },
  {
    name: 'tenphi.me',
    tag: 'Personal Site',
    description:
      "Portfolio and blog of Tasty's author, built with Astro and styled with Tasty for layout, components, and article pages.",
    href: 'https://github.com/tenphi/tenphi.me',
    icon: <IconBrandGithub size={22} stroke={1.5} />,
    tint: 'teal',
  },
];

export default function InTheWild() {
  return (
    <SectionWrap fill="#surface-2">
      <Section id="in-the-wild">
        <Section.Title>In the Wild</Section.Title>
        <Section.Subtitle>
          Articles about the project and products powered by Tasty
        </Section.Subtitle>
        <Section.Content>
          <SubHeader>Articles</SubHeader>
          <Grid gridColumns={{ '': '1sf', '@mobile': '1sf' }} gap="3x">
            {ARTICLES.map((article) => (
              <ArticleCard
                key={article.title}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArticleCard.Title>{article.title}</ArticleCard.Title>
                <ArticleCard.Description>
                  {article.description}
                </ArticleCard.Description>
                <Text
                  preset="t3m"
                  color="#accent-text"
                  margin="top 1x"
                  placeSelf="start"
                >
                  Read article →
                </Text>
              </ArticleCard>
            ))}
          </Grid>

          <SubHeader>Where It&apos;s Used</SubHeader>
          <Grid gridColumns={{ '': '1sf 1sf', '@mobile': '1sf' }} gap="3x">
            {USAGE.map((item) => (
              <Card
                as="a"
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                variant={item.tint}
              >
                <Card.Header>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Icon>{item.icon}</Card.Icon>
                </Card.Header>
                <Card.Description>{item.description}</Card.Description>
                <Badge
                  fill="#tint-surface-strong"
                  color="#tint-accent-strong"
                  placeSelf="start"
                  margin="top auto"
                >
                  {item.tag}
                </Badge>
              </Card>
            ))}
          </Grid>
        </Section.Content>
      </Section>
    </SectionWrap>
  );
}
